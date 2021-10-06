<template>
    <div class="container">
        <div class="title__div" :class="titleClass">
            <h4>
                <slot name="title"></slot>
            </h4>
        </div>
        <div v-if="hasButtons" class="col-6 buttons__div">
            <slot name="buttons"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mode: {
            required: false,
            default: null,
        }
    },
    computed: {
        hasButtons() {
            return this.mode === 'withButtons';
        },
        titleClass() {
            return {"col-6": this.hasButtons}
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
}

.title__div {
    padding-top: 2rem;
    margin-right: 1rem;
}

.buttons__div {
    padding-top: 1rem;
    margin-left: 1rem;
    margin: auto;
}

.buttons__div > * {
    margin: 0 1rem 0 1rem;
}
</style>