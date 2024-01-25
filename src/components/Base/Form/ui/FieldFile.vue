<template>
  <div class="input-file">
    <div
      class="input-file__button"
      :class="[`${disabled ? 'input-file_disabled' : ''}`]"
    >
      <label class="input-file__sendfile" :style="{ color: $widjet().global.dopPrimary }">
        <input
          type="file"
          accept="image/*,application/pdf, .doc, .docx, .xlsx"
          @change="onInput"
          :disabled="disabled"
        />
        <Icon size="s" iconName="pin" />
        <p v-if="title">Прикрепить файл</p>
      </label>
      <p
        v-if="typeField !== 'Chat'"
        class="input-file__name t_small"
        :style="{ color: $widjet().global.dopPrimary }"
      >
        {{ getFileName }}
      </p>
    </div>
  </div>
</template>
  
<script>
import Icon from "../../Icon.vue";
export default {
  name: "InputFile",
  components: { Icon },
  props: {
    title: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    typeField: {
      type: String,
    },
    file: Object
  },
  // data() {
  //   return {
  //     selectedFile: null,
  //   };
  // },
  methods: {
    onInput(event) {
      if (this.disabled) {
        event.preventDefault();
        event.target.value = null;
      } else {
        this.onFileSelected(event);
      }
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      if (file && file.size <= 3000000) {
        const fileType = file.type;
        if (
          fileType === "image/jpeg" ||
          fileType === "image/jpg" ||
          fileType === "image/png" ||
          fileType === "image/heic" ||
          fileType === "application/pdf" ||
          fileType === "application/msword" || // Check for doc
          fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // Check for docx
          fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // Check for xlsx
        ) {
          // this.selectedFile = file;
          alert("Файл успешно выбран");
          const replaceFileType = fileType.split('/')[1];
          this.$emit("type", replaceFileType);
        } else {
          alert(
            "Пожалуйста, выберите картинку (jpeg, jpg, png, heic) или файл PDF"
          );
          return;
          // this.selectedFile = null;
        }
      } else {
        alert('Загрузите файл весом меньше 3мб');
        return;
      }
      this.$emit("update:file", file);
    },
  },
  computed: {
    getFileName() {
      if (!this.file) return "";
      return this.file.name;
    },
  },
};
</script>
  
<style scoped lang="scss">
.input-file {
  position: relative;
  &__sendfile {
    transition: all .3s ease-in-out;
    &:hover {
      opacity: .67;
    }
  }
  &__button {
    overflow: hidden;
    border-radius: 4px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;

    &:hover {
      cursor: pointer;
    }

    input[type="file"] {
      display: none;
    }

    label {
      cursor: inherit;
      display: flex;
      align-items: center;

      .v-icon {
        height: 24px;
        width: 18px;
      }
    }

    p {
      font-size: 10px;
      margin-left: 6px;
    }
  }

  &_disabled {
    cursor: not-allowed;
    &:hover {
      cursor: not-allowed;
    }
  }

  &__name {
    position: absolute;
    bottom: -10px;
    left: 0;
    text-align: left;
    width: 100px;
    height: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    overflow: hidden;
    margin-left: 0;
  }
}
</style>