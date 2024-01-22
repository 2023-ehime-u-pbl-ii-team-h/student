import { RadioListItem } from "@/atoms/list-item";
import styles from "./subject-search.module.css";
import { useState } from "react";
import { PartialSubject, useSubjectSearch } from "@/queries/subject-search";

export type SubjectSearchProps = {
  onSelectItem: (subject: PartialSubject) => void;
};

export function SubjectSearch({
  onSelectItem,
}: SubjectSearchProps): JSX.Element {
  const [input, setInput] = useState("");
  const resultItems = useSubjectSearch(input);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function onSelect(selectedId: string) {
    if (!resultItems) {
      return;
    }
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
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      {resultItems && (
        <>
          <hr />
          <div className={styles.searchResultMenu}>
            {resultItems.length === 0 ? (
              <div>
                <p className="body-medium">
                  該当する科目が見つかりませんでした
                </p>
                <p className="body-small">検索条件を変えてみましょう</p>
              </div>
            ) : (
              resultItems.map(({ id, name, next_board_end }) => (
                <RadioListItem
                  key={id}
                  groupName="search_choice"
                  headline={name}
                  supportingText={next_board_end ?? ""}
                  selected={selectedId === id}
                  onClick={() => onSelect(id)}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
