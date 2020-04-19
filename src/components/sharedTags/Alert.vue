<template>
    <v-alert error dismissible @input='closeW ' :value='true'>{{text}}</v-alert>
</template>
<script>
export default {
    props:['text'],
        methods:{
        closeW(){
            this.$emit('dismissedAlert')
        }
    }
}
</script>