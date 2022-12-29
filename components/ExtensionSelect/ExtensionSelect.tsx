import BodyText from "components/Typography/BodyText/BodyText";
import { Extension } from "constants/availableTokenTypes";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./ExtensionSelect.module.scss";

const ExtensionSelect = ({
  extensions,
  selectedExtensions,
  setSelectedExtensions,
}: {
  extensions: Extension[];
  selectedExtensions: string[];
  setSelectedExtensions: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    extension: string
  ) => {
    if (e.target.checked) {
      setSelectedExtensions([...selectedExtensions, extension]);
    } else {
      setSelectedExtensions(
        selectedExtensions.filter(
          (selectedExtension) => selectedExtension !== extension
        )
      );
    }
  };

  return (
    <div>
      <BodyText>Select extensions you want to add to your token</BodyText>
      <div className={styles.extensions}>
        {extensions.map((extension) => (
          <div key={extension.name} className={styles.extension}>
            <p className={styles.name}>{extension.name}</p>
            <p className={styles.description}>{extension.description}</p>
            {extension.advanced && (
              <p className={styles.advanced}>Advanced option</p>
            )}
            <input
              type="checkbox"
              checked={selectedExtensions.includes(extension.name)}
              onChange={(e) => handleSelect(e, extension.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtensionSelect;
