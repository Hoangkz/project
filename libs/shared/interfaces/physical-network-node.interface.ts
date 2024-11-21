export interface INode {
  id: string;
  name: string;
  totalPort: number;
  odf?: string;
  usedPorts: number;
  fromNode?: string;
  cables?: string;
}
export interface ICableLink {
  name: string;
  totalCores: number;
  usedCores: number;
}

export interface IConnector {
  from: string;
  fromPort: number;
  to: string;
  toPort: number;
  type?: 'IN' | 'OUT' | 'MID';
}
export interface IPhysicalnetworkNode {
  label: string;
  type: string;
  id: string;
  nodes: INode[];
  connectors: IConnector[];
  link?: ICableLink;
  children: IPhysicalnetworkNode[];
}
