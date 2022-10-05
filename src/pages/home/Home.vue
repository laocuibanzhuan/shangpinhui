<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Today></Today>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Today from "./Today";
import Rank from "./Rank";
import Like from "./Like";
import Brand from "./Brand";
import Floor from "./Floor";

export default {
  components: {
    ListContainer,
    Today,
    Rank,
    Like,
    Brand,
    Floor,
  },
};
</script>

<style></style>
