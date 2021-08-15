<template>
  <div class="editor" v-if="editor">
    <div class='editor__instruments' v-if="editable">
      <EditorControlBase
        class='editor__instruments-row'
        :editor="editor"/>
    </div>
    <EditorContent class="editor__content" :editor="editor" />
    <div class="editor__characters-count" v-if="limit - editor.getCharacterCount() <= 100">
      {{ editor.getCharacterCount() }}/{{ limit }} символов
    </div>
  </div>
</template>

<script>
import './Editor.scss';

import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';

import EditorControlBase from './EditorControlBase.vue';

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => ({
          backgroundColor: element.getAttribute('data-background-color'),
        }),
        renderHTML: (attributes) => ({
          'data-background-color': attributes.backgroundColor,
          style: `background-color: ${attributes.backgroundColor}`,
        }),
      },
    };
  },
});

export default {
  components: {
    EditorContent,
    EditorControlBase,
  },

  props: {
    content: {
      type: String,
      default: '',
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      editor: null,
      limit: 15000,
    };
  },

  watch: {
    content(value) {
      const isSame = this.editor.getHTML() === value;

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(this.content, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.content,
      editable: this.editable,
      extensions: [
        StarterKit,
        Underline,
        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        CustomTableCell,
        TableHeader,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight,
        Link,
        CharacterCount.configure({
          limit: this.limit,
        }),
      ],
      onUpdate: () => {
        this.$emit('update:content', this.editor.getHTML());
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
