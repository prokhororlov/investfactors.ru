<template>
  <div>
    <div v-if="editor">
      <ElRow>
        <ElButton
          circle
          icon="el-icon-picture-outline"
          @click="addImage" />
        <ElButton round
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }">
          bold
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }">
          italic
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }">
          strike
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }">
          code
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().unsetAllMarks().run()">
          clear marks
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().clearNodes().run()">
          clear nodes
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }">
          paragraph
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          h1
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          h2
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
          h3
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
          h4
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
          h5
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
          h6
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }">
          bullet list
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }">
          ordered list
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }">
          code block
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }">
          blockquote
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().setHorizontalRule().run()">
          horizontal rule
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().setHardBreak().run()">
          hard break
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().undo().run()">
          undo
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().redo().run()">
          redo
        </ElButton>
      </ElRow>
    </div>
    <editor-content class="editor" :editor="editor" />
  </div>
</template>

<script>
import { ElButton } from 'element-plus';
import './Editor.scss';

import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';

export default {
  components: {
    EditorContent,
    ElButton,
  },

  props: {
    modelValue: {
      type: String,
      default: `
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `,
    },
  },

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value;

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(this.modelValue, false);
    },
  },

  methods: {
    addImage() {
      const url = window.prompt('URL');

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
      ],
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML());
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
