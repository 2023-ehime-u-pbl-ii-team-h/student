"use client";

import { SubjectSearch } from "@/molecules/subject-search";
import styles from "./subject-form.module.css";
import { FilledButton } from "@/atoms/button";
import { useState } from "react";
import { registerSubject } from "@/commands/register-subject";
import { useAccount, useMsal } from "@azure/msal-react";
import { PartialSubject } from "@/queries/subject-search";

export function SubjectForm(): JSX.Element {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] ?? {});
  const [selected, setSelected] = useState<PartialSubject | null>(null);

  async function subscribeSubject() {
    if (!selected || !account) {
      return;
    }

    const tokenRes = await instance.acquireTokenSilent({
      scopes: ["User.Read"],
      account,
    });
    await registerSubject(tokenRes.accessToken, selected.id);
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
        <dd>{selected?.next_board_end}</dd>
      </dl>
      <FilledButton
        label="選択した科目を追加"
        innerProps={{
          onClick: () => subscribeSubject().catch(console.error),
          disabled: !selected,
        }}
      />
    </div>
  );
}
