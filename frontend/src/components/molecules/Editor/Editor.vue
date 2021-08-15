<template>
  <div class="editor">
    <div class='editor__instruments' v-if="editor">
      <EditorControlBase
        class='editor__instruments-row'
        :editor="editor"/>
    </div>
    <EditorContent class="editor__content" :editor="editor" />
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

import EditorControlBase from './EditorControlBase.vue';

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),
      // and add a new one …
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
  },

  data() {
    return {
      editor: null,
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
