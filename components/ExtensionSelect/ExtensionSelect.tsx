import Text from "components/Typography/Text/Text";
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
  const handleSelect = (extension: string) => {
    if (selectedExtensions.includes(extension)) {
      setSelectedExtensions(
        selectedExtensions.filter((ext) => ext !== extension)
      );
    } else {
      setSelectedExtensions([...selectedExtensions, extension]);
    }
  };

  return (
    <div>
      <Text>Select extensions you want to add to your token</Text>
      <div className={styles.extensions}>
        {extensions.map((extension) => (
          <div
            key={extension.name}
            className={styles.extension}
            onClick={(e) => handleSelect(extension.name)}
          >
            <p className={styles.name}>{extension.name}</p>
            <p className={styles.description}>{extension.description}</p>
            {extension.advanced && (
              <p className={styles.advanced}>Advanced option</p>
            )}
            <input
              type="checkbox"
              checked={selectedExtensions.includes(extension.name)}
              onChange={(e) => handleSelect(extension.name)}
            />
          </div>
        ))}
      </div>
      <Text>Select management type</Text>
      <div className={styles.extensions}>
        {controlTypes.map((controlType) => (
          <div
            key={controlType.name}
            className={styles.extension}
            onClick={() => setManagementType(controlType.type)}
          >
            <p className={styles.name}>{controlType.name}</p>
            <p className={styles.description}>{controlType.description}</p>
            <input
              type="radio"
              checked={managementType === controlType.type}
              onChange={() => setManagementType(controlType.type)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtensionSelect;
