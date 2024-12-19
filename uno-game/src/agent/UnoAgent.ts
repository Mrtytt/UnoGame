import * as tf from "@tensorflow/tfjs";

class UnoAgent {
  private model: tf.LayersModel;
  private replayMemory: any[];
  private readonly DISCOUNT_FACTOR = 0.7;
  private readonly BATCH_SIZE = 512;
  private readonly REPLAY_MEMORY_SIZE = 10000;

  constructor(stateSize: number, actionCount: number) {
    this.model = this.createModel(stateSize, actionCount);
    this.replayMemory = [];
  }

  // Modeli oluştur
  createModel(stateSize: number, actionCount: number) {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 64,
        activation: "relu",
        inputShape: [stateSize],
      })
    );
    model.add(tf.layers.dense({ units: 64, activation: "relu" }));
    model.add(tf.layers.dense({ units: 64, activation: "relu" }));
    model.add(tf.layers.dense({ units: actionCount, activation: "linear" }));

    model.compile({
      optimizer: tf.train.adam(),
      loss: "meanSquaredError",
    });
    return model;
  }

  // Durumdan en iyi aksiyonu tahmin et
  predict(state: number[]) {
    const prediction = this.model.predict(tf.tensor2d([state])) as tf.Tensor;
    const predictionArray = (prediction.arraySync() as number[][])[0]; // İlk boyutu al
    return predictionArray.indexOf(Math.max(...predictionArray)); // En yüksek Q-değerine sahip aksiyonu seç
  }

  // Replay memory'e yeni bir geçiş ekle
  updateReplayMemory(transition: any) {
    this.replayMemory.push(transition);
    if (this.replayMemory.length > this.REPLAY_MEMORY_SIZE) {
      this.replayMemory.shift(); // Bellek dolarsa eski geçişi sil
    }
  }

  // Modeli eğit
  async train() {
    if (this.replayMemory.length < this.BATCH_SIZE) return;

  const batch = this.replayMemory.slice(0, this.BATCH_SIZE); // Minibatch al
  const states = batch.map((transition) => transition[0]);
  const actions = batch.map((transition) => transition[1]);
  const rewards = batch.map((transition) => transition[2]);
  const nextStates = batch.map((transition) => transition[3]);
  const doneFlags = batch.map((transition) => transition[4]);

  // Tensor hesaplamaları
  const qValuesTensor = this.model.predict(tf.tensor2d(states)) as tf.Tensor;
  const maxFutureQTensor = this.model.predict(
    tf.tensor2d(nextStates)
  ) as tf.Tensor;

  const qValuesArray = (await qValuesTensor.array()) as number[][];
  const maxFutureQArray = (await maxFutureQTensor.array()) as number[][];

  for (let i = 0; i < batch.length; i++) {
    const action = actions[i];
    const reward = rewards[i];
    const done = doneFlags[i];
    const targetQ =
      reward +
      (done ? 0 : this.DISCOUNT_FACTOR * Math.max(...maxFutureQArray[i]));
    qValuesArray[i][action] = targetQ;
  }

    // Modeli minibatch ile eğit
    await this.model.fit(tf.tensor2d(states), tf.tensor2d(qValuesArray), {
      batchSize: this.BATCH_SIZE,
    });
  }
}

export default UnoAgent;
