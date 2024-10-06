---
description: Syntax of Config Files
---

# Config Syntax

We used the `yaml` file format for config with some slight enhancement - the `!include`, `!include_dataset` and `!flatten` tags.

When using `Utility.Config.load_config` to read `yaml` file, the parser will have following action when the aforementioned tags are met:

* `!include <PATH>.yaml` will read the yaml file specified as the argument and directly concatenate the content into the position of `!include` tag. If you are using relative path, the working directory is the directory that the `yaml` file you are trying to load.

* `!include_dataset <DATASET_PATH>.yaml` will read the yaml file specified as the argument, *decompress* the file, and concatenate a sequence of sequence configurations into the position of `!include_dataset` tag. The file included by `!include_dataset` must begin with magic header of `#*IS_DATASET_TYPE*#` and have the format of

    ```yaml title="Dataset.yaml"
    #*IS_DATASET_TYPE*#
    type: SEQ_TYPE
    dataroot: /data2/datasets/wenshanw/tartanair_test_release/stereo/

    # Arbitrary keys that are shared across all sequences
    shared_key: some_value

    roots:
    - root: SE000
        # Arbitrary keys that are specific to each sequence
        private_key: seq_id_1
        
    - root: SE001
        # Arbitrary keys that are specific to each sequence
        private_key: seq_id_2
    ```

    Will be translated into 

    ```yaml title="Actually_Loaded.yaml"
    - type: SEQ_TYPE
      dataroot: /data2/datasets/wenshanw/tartanair_test_release/stereo/SE000
      private_key: seq_id_1
      shared_key: some_value

    - type: SEQ_TYPE
      dataroot: /data2/datasets/wenshanw/tartanair_test_release/stereo/SE001
      private_key: seq_id_2
      shared_key: some_value
    ```

* `!flatten` is used directly on a sequence (list) in yaml and will flatten the nested sequence into a "flat" sequence.

    ```yaml title="Dataset.yaml"
    arrays: !flatten
        - - a
          - b
        - c
    ```

    Will be translated to 

    ```yaml title="Acutally_Loaded.yaml"
    arrays:
        - a
        - b
        - c
    ```
