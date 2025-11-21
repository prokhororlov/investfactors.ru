<template>
  <div class="stock" v-if="ticker">
    <div class="stock__header">
      <a href="/"><img :src="logo" class="stock__logo" alt="Invest Factors" /></a>
    </div>
    <ShortOverview :ticker="ticker" class="stock__chart" :height="367" />
    <CompanyProfile :ticker="ticker" class="stock__profile" :height="367"/>
    <Metrics :ticker="ticker" class="stock__metrics" :height="386"/>
    <!-- <Editor :content="content" class="stock__editor" :height="500" :editable="true"/> -->
  </div>
</template>

<script>
import { Metrics } from '../../packages/TradingView';
import ShortOverview from '../../packages/BestStocks/ShortOverview.vue';
import CompanyProfile from './src/CompanyProfile.vue';
// import { Editor } from '../../components/molecules';
import logo from '../../assets/img/logo.svg';

export default {
  name: 'Stock',
  components: {
    ShortOverview,
    Metrics,
    CompanyProfile,
    // Editor,
  },
  props: {
    ticker: String,
  },
  data() {
    return {
      logo,
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
  padding: 16px 24px;
  box-shadow: 0 0 10px 10px #ededed;
  border-radius: 12px;
  grid-template-areas:
    "header header"
    "chart profile"
    "metrics metrics"
    "editor editor";
  grid-template-columns: 50%;

  @media (max-width: 550px) {
    padding: 16px;
  }

  &__header {
    grid-area: header;
    display: flex;
    align-items: center;
    padding: 8px 0 12px;
  }

  &__logo {
    height: 40px;
    width: auto;

    @media (max-width: 767px) {
      height: 32px;
    }
  }

  &__chart { grid-area: chart; }
  &__profile { grid-area: profile; }
  &__metrics { grid-area: metrics; }
  &__editor { grid-area: editor; }

  @media (max-width: calc(768px + 35px)) {
    grid-template-areas:
      "header"
      "chart"
      "profile"
      "metrics"
      "editor";
    grid-template-columns: 100%;
  }

  grid-gap: 16px;
}
</style>
