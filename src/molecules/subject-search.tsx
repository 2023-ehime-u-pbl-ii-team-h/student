import { RadioListItem } from "@/atoms/list-item";
import styles from "./subject-search.module.css";
import { useState } from "react";
import { Subject } from "@/queries/subjects";

export type SubjectSearchProps = {
  onSelectItem: (subject: Subject) => void;
};

export function SubjectSearch({
  onSelectItem,
}: SubjectSearchProps): JSX.Element {
  const resultItems = [
    { id: "sub01", name: "xxxx", lastDate: "2024-01-01" },
    { id: "sub02", name: "xxxx", lastDate: "2024-01-01" },
    { id: "sub03", name: "xxxx", lastDate: "2024-01-01" },
    { id: "sub04", name: "xxxx", lastDate: "2024-01-01" },
    { id: "sub05", name: "xxxx", lastDate: "2024-01-01" },
  ];

  const [selectedId, setSelectedId] = useState<string | null>(null);

  function onSelect(selectedId: string) {
    setSelectedId((currentId) =>
      selectedId === currentId ? null : selectedId,
    );
    onSelectItem(resultItems.find(({ id }) => id === selectedId)!);
  }

  return (
    <div
      className={`surface-container-high on-surface-text ${styles.container}`}
    >
      <input
        className={`body-large ${styles.searchInput}`}
        placeholder="科目名で検索…"
      />
      <hr />
      <div className={styles.searchResultMenu}>
        {resultItems.map(({ id, name, lastDate }) => (
          <RadioListItem
            key={id}
            groupName="search_choice"
            headline={name}
            supportingText={lastDate}
            selected={selectedId === id}
            onClick={() => onSelect(id)}
          />
        ))}
      </div>
    </div>
  );
}
