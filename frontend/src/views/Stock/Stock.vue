<template>
  <div class="stock" v-if="ticker">
    <ShortOverview :ticker="ticker" class="stock__chart" :height="367" />
    <CompanyProfile :ticker="ticker" class="stock__profile" :height="367"/>
    <Metrics :ticker="ticker" class="stock__metrics" :height="386"/>
    <Editor :content="content" class="stock__editor" :height="500" :editable="true"/>
  </div>
</template>

<script>
import { Metrics } from '../../packages/TradingView';
import ShortOverview from '../../packages/BestStocks/ShortOverview.vue';
import CompanyProfile from './src/CompanyProfile.vue';
import { Editor } from '../../components/molecules';

export default {
  name: 'Stock',
  components: {
    ShortOverview,
    Metrics,
    CompanyProfile,
    Editor,
  },
  props: {
    ticker: String,
  },
  data() {
    return {
      content: `
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
    };
  },
};
</script>

<style lang="scss">
.stock {
  display: grid;
  padding: 16px;
  grid-template-areas:
    "chart profile"
    "metrics metrics"
    "editor editor";
  grid-template-columns: 50%;

  // &__info { grid-area: info; }
  &__chart { grid-area: chart; }
  &__profile { grid-area: profile; }
  &__metrics { grid-area: metrics; }
  &__editor { grid-area: editor; }

  // &__info {
  //   height: 171px!important;
  // }

  @media (max-width: calc(768px + 35px)) {
    grid-template-areas:
      // "info"
      "chart"
      "profile"
      "metrics"
      "editor";
    grid-template-columns: 100%;

    // &__chart{
    //   height: 300px!important;
    // }

    // &__info {
    //   width: 100%;
    //   height: 248px!important;
    // }
  }

  grid-gap: 16px;
}
</style>
