<template>
  <div class="profile">
    <el-avatar shape="circle" :size="100" :src="$auth.user?.picture" class="profile__avatar"/>
    <div class="profile__bio">
      <strong>Email:</strong> {{ $auth.user.email }}<br/>
      <strong>Имя:</strong> {{ $auth.user.given_name }}<br/>
      <strong>Фамилия:</strong> {{ $auth.user.family_name }}<br/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>

<style lang="scss">
.profile {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 100px 50%;
  text-align: left;
  grid-gap: 16px;
  padding: 16px;

  &__bio{
    padding-top: 16px;
  }
}
</style>
