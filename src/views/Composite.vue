<template>
  <v-container class="my-5">
    <v-card>
      <v-layout justify-center align-center>
        <v-flex class="pa-3">Aggregation By Calculating the Moving Average</v-flex>

        <v-spacer></v-spacer>

        <v-flex md1>
          <v-btn flat>View</v-btn>
        </v-flex>

        <v-flex md1>
          <v-btn flat>Delete</v-btn>
        </v-flex>

        <v-flex md1>
          <AddCompositeDialog />
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import AddCompositeDialog from "@/components/AddCompositeDialog.vue"

export default {
  components:{
    AddCompositeDialog
  }
};
</script>

<style>
</style>
