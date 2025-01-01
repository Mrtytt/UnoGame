export const addCSS = () => {
  const style = document.createElement("style");
  style.innerHTML = `
      .card-animation {
        position: absolute;
        width: 50px;
        height: 75px;
        background-image: url('/cardback.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        transition: transform 2.0s ease;
      }
    `;
  document.head.appendChild(style);
};

export const animateCardToPlayer = (
  card: any,
  delay: number,
  playerPosition: "top" | "right" | "bottom" | "left",
  onAnimationComplete: () => void
) => {
  const animationElement = document.createElement("div");
  animationElement.className = "card-animation";
  addCSS();

  const startPosition = "translate(1350%, -550%)";
  animationElement.style.transform = startPosition;
  animationElement.style.transition = `transform 1.0s ease ${delay}ms`;

  document.body.appendChild(animationElement);

  setTimeout(() => {
    const transform = getCardTransform(playerPosition);
    animationElement.style.transform = transform;

    setTimeout(() => {
      document.body.removeChild(animationElement); // DOM'daki animasyon elementini kaldır
      onAnimationComplete(); // Animasyon tamamlandığında çalıştırılacak fonksiyon
    }, 1000); // Animasyon süresi
  }, 10); // Başlatma gecikmesi
};

export const getCardTransform = (
  position: "top" | "right" | "bottom" | "left"
) => {
  switch (position) {
    case "top":
      return "translate(1250%, -975%)";
    case "right":
      return "translate(2450%, -550%)";
    case "bottom":
      return "translate(1250%, -100%)";
    case "left":
      return "translate(150%, -550%)";
    default:
      return "translate(-50%, -50%)";
  }
};
export const animateCard = (
  animationElement: HTMLDivElement,
  startPosition: string,
  targetTransform: string,
  onComplete: () => void
) => {
  animationElement.style.transform = startPosition;

  setTimeout(() => {
    animationElement.style.transform = targetTransform;

    setTimeout(() => {
      onComplete();
      document.body.removeChild(animationElement);
    }, 1000); // Animasyon süresi
  }, 10); // Başlangıç gecikmesi
};
export const createAnimationElement = (): HTMLDivElement => {
    const animationElement = document.createElement("div");
    animationElement.className = "card-animation";
    addCSS();
    document.body.appendChild(animationElement);
    return animationElement;
  };