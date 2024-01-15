import styles from "./list-item.module.css";

export type RadioListItemProps = {
  groupName: string;
  condition?: "ONE_LINE" | "MULTI_LINES";
  headline: string;
  supportingText?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function RadioListItem({
  groupName,
  condition = "ONE_LINE",
  headline,
  supportingText,
  selected = false,
  disabled = false,
  onClick,
}: RadioListItemProps): JSX.Element {
  return (
    <label
      className={`surface on-surface-text ${styles.listItem}`}
      data-condition={condition}
      data-disabled={disabled}
    >
      <input
        type="radio"
        className={styles.leadingItem}
        name={groupName}
        value=""
        onChange={onClick}
        disabled={disabled}
        checked={selected}
      />
      <div>
        <div className="body-large">{headline}</div>
        {supportingText && (
          <div className="body-medium on-surface-variant-text">
            {supportingText}
          </div>
        )}
      </div>
      <div className={styles.stateLayer} />
    </label>
  );
}
