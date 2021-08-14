<template>
  <div>
    <div v-if="editor">
      <ElRow>
        <ElButton size="mini" @click="addImage">
          <Icon name="card-image"/>
        </ElButton>

        <ElButton size="mini"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }">
          <Icon name="type-bold"/>
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }">
          <Icon name="type-italic"/>
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }">
          <Icon name="type-strikethrough"/>
        </ElButton>

        <!-- <ElButton round
          @click="editor.chain().focus().unsetAllMarks().run()">
          clear marks
        </ElButton>
        <ElButton round
          @click="editor.chain().focus().clearNodes().run()">
          clear nodes
        </ElButton> -->

        <ElButton size="mini"
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }">
          <Icon name="paragraph"/>
        </ElButton>

        <ElButton size="mini"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          <Icon name="type-h1"/>
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          <Icon name="type-h2"/>
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
          <Icon name="type-h3"/>
        </ElButton>

        <ElButton size="mini"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }">
          <Icon name="list-ul"/>
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }">
          <Icon name="list-ol"/>
        </ElButton>

        <ElButton size="mini"
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }">
          <Icon name="code"/>
        </ElButton>

        <ElButton size="mini"
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }">
          <Icon name="code-slash"/>
        </ElButton>

        <ElButton size="mini"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }">
          <Icon name="chat-square-quote"/>
        </ElButton>

        <ElButton size="mini"
          @click="editor.chain().focus().setHorizontalRule().run()">
          <Icon name="hr"/>
        </ElButton>

        <ElButton size="mini"
          @click="editor.chain().focus().undo().run()">
          <Icon name="arrow-left"/>
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().redo().run()">
          <Icon name="arrow-right"/>
        </ElButton>
      </ElRow>
    </div>
    <editor-content class="editor" :editor="editor" />
  </div>
</template>

<script>
import {
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
} from 'element-plus';

import './Editor.scss';

import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';

import { Icon } from '../../atoms';

export default {
  components: {
    EditorContent,
    ElButton,
    Icon,
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
