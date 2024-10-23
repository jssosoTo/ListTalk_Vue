<template>
  <section @click.stop class="modal"><slot></slot></section>
</template>

<style scoped>
.modal {
  display: inline-block;
  background-color: var(--nav-bg);
  padding: 1rem 0;
  margin-top: 15vh;
  min-width: 30vw;
  box-shadow: 5px 10px 25px 5px rgba(0, 0, 0, 0.5);

  border-radius: 15px !important;
  /* border-width: 3px;
  border-style: solid;
  border-image: conic-gradient(from var(--angle), red, blue, red) 1;
  animation: 1s spin linear infinite; */
}
</style>
