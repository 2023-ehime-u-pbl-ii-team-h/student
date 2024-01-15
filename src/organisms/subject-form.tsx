"use client";

import { SubjectSearch } from "@/molecules/subject-search";
import styles from "./subject-form.module.css";
import { FilledButton } from "@/atoms/button";
import { useState } from "react";
import { Subject } from "@/queries/subjects";

export function SubjectForm(): JSX.Element {
  const [selected, setSelected] = useState<Subject | null>(null);

  function subscribeSubject() {
    if (!selected) {
      return;
    }
    console.dir(selected);
  }

  return (
    <div className={styles.form}>
      <SubjectSearch onSelectItem={setSelected} />
      <dl className={styles.selectionStatus}>
        <dt>科目名</dt>
        <dd>{selected?.name}</dd>
        <dt>担当教員リスト</dt>
        <dd>
          <ul></ul>
        </dd>
        <dt>次の出席申請受付日時</dt>
        <dd>{selected?.lastDate}</dd>
      </dl>
      <FilledButton
        label="選択した科目を追加"
        innerProps={{
          onClick: subscribeSubject,
          disabled: !selected,
        }}
      />
    </div>
  );
}
