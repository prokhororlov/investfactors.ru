<template>
  <ElRow>
    <ElButtonGroup>
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
      <ElButton size="mini"
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'is-active': editor.isActive('underline') }">
        <Icon name="type-underline"/>
      </ElButton>
      <ElButton size="mini"
        @click="editor.chain().focus().toggleHighlight().run()"
        :class="{ 'is-active': editor.isActive('highlight') }">
        <Icon name="file-font-fill" />
      </ElButton>
    </ElButtonGroup>
    <ElButtonGroup>
      <ElButton size="mini"
        @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        <Icon name="text-left" />
      </ElButton>
      <ElButton size="mini"
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
        <Icon name="text-center" />
      </ElButton>
      <ElButton size="mini"
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
        <Icon name="text-right" />
      </ElButton>
      <ElButton size="mini"
        @click="editor.chain().focus().setTextAlign('justify').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
        <Icon name="justify" />
      </ElButton>
    </ElButtonGroup>

    <!-- <ElButton size="mini" round
      @click="editor.chain().focus().unsetAllMarks().run()">
      clear marks
    </ElButton>
    <ElButton size="mini" round
      @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </ElButton> -->

    <ElButtonGroup>
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
    </ElButtonGroup>

    <ElButtonGroup>
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
    </ElButtonGroup>

    <ElButtonGroup>
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
    </ElButtonGroup>

    <ElButton size="mini" @click="addImage">
      <Icon name="card-image"/>
    </ElButton>

    <ElButtonGroup>
      <ElButton size="mini"
        @click="editor.chain().focus().insertTable({ rows: 4, cols: 3, withHeaderRow: true }).run()"
        :disabled="editor.isActive('table')"
        :class="{ 'is-active': editor.isActive('table') }">
        <Icon name="table" />
      </ElButton>
      <template v-if="editor.isActive('table')">
        <ElButton size="mini"
          @click="editor.chain().focus().deleteTable().run()"
          :disabled="!editor.can().deleteTable()">
          <Icon name="x-square" />
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().addColumnBefore().run()"
          :disabled="!editor.can().addColumnBefore()">
          <Icon name="square-half" />
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().addColumnAfter().run()"
          :disabled="!editor.can().addColumnAfter()">
          <Icon name="square-half" :rotate="180"/>
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().addRowBefore().run()"
          :disabled="!editor.can().addRowBefore()">
          <Icon name="square-half" :rotate="90"/>
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().addRowAfter().run()"
          :disabled="!editor.can().addRowAfter()">
          <Icon name="square-half" :rotate="270"/>
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().deleteColumn().run()"
          :disabled="!editor.can().deleteColumn()">
          <Icon name="file-x" />
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().deleteRow().run()"
          :disabled="!editor.can().deleteRow()">
          <Icon name="file-x" :rotate="90" />
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().toggleHeaderCell().run()"
          :disabled="!editor.can().toggleHeaderCell()">
          <Icon name="back" />
        </ElButton>
        <ElButton size="mini"
          @click="editor.chain().focus().mergeOrSplit().run()"
          :disabled="!editor.can().mergeOrSplit()">
          <Icon v-if="editor.can().splitCell()" name="arrows-expand" />
          <Icon v-else name="arrows-collapse" />
        </ElButton>
      </template>
    </ElButtonGroup>

    <!-- <ElButton size="mini"
      @click="editor.chain().focus().setHorizontalRule().run()">
      <Icon name="hr"/>
    </ElButton> -->

    <!-- <ElButtonGroup>
      <ElButton size="mini"
        @click="editor.chain().focus().undo().run()">
        <Icon name="arrow-left"/>
      </ElButton>

      <ElButton size="mini"
        @click="editor.chain().focus().redo().run()">
        <Icon name="arrow-right"/>
      </ElButton>
    </ElButtonGroup> -->
  </ElRow>
</template>

<script>
import { ElButton, ElRow, ElButtonGroup } from 'element-plus';
import { Icon } from '../../atoms';

export default {
  props: {
    editor: Object,
  },
  components: {
    ElRow,
    ElButton,
    Icon,
    ElButtonGroup,
  },
  methods: {
    addImage() {
      const url = window.prompt('URL');

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
  },
};
</script>
