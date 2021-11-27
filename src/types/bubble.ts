export interface Bubble {
  color: string;
  key: number;
  hovered: boolean;
  class?: string;
  deleted?: boolean;
}

export interface BubblePosition {
  x: number;
  y: number;
}

export interface BubbleTarget {
  x: number;
  y: number;
  requiredColor: string;
}
export function getBubbles(): Bubble[][] {
  const allBubblles: Bubble[][] = [];

  for (let x = 0; x < 16; x++) {
    const bubbles: Bubble[] = [];
    for (let y = 0; y < 9; y++) {
      bubbles.push({ color: getColor(), key: y, hovered: false });
    }
    allBubblles.push(bubbles);
  }
  console.log("allbubs:", allBubblles);
  return allBubblles;
}

function getColor(): string {
  const idx = Math.floor(Math.random() * 4);
  switch (idx) {
    case 0:
      return "red";
    case 1:
      return "green";
    case 2:
      return "blue";
    case 3:
      return "yellow";
    default:
      return "";
  }
}
