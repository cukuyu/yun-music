export type  effectNode = (ac:AudioContext)=>{ play: () => void; pause: () => void, node:AudioNode}