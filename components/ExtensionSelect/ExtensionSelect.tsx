import BodyText from "components/Typography/BodyText/BodyText";
import { AccessControl, Extension } from "constants/availableTokenTypes";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./ExtensionSelect.module.scss";

const ExtensionSelect = ({
  extensions,
  selectedExtensions,
  setSelectedExtensions,
  controlTypes,
  managementType,
  setManagementType,
}: {
  extensions: Extension[];
  selectedExtensions: string[];
  setSelectedExtensions: Dispatch<SetStateAction<string[]>>;
  controlTypes: AccessControl[];
  managementType: string;
  setManagementType: Dispatch<SetStateAction<string>>;
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
      <BodyText>Select management type</BodyText>
      <div className={styles.extensions}>
        {controlTypes.map((controlType) => (
          <div key={controlType.name} className={styles.extension}>
            <p className={styles.name}>{controlType.name}</p>
            <p className={styles.description}>{controlType.description}</p>
            <input
              type="radio"
              checked={managementType === controlType.type}
              onChange={(e) => setManagementType(controlType.type)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtensionSelect;