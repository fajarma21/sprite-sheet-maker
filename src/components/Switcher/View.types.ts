export interface SwitcherProps {
  data: { id: number; label: string }[];
  activeId: number;
  onChange: (id: number) => void;
}
