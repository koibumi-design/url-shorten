<script lang="ts">
import {onMount} from "svelte";

export let selected: number = 0;

const BREAK_POINT = 512;

let screenWidth = 1024;

function updateWidth() {
    screenWidth = window.innerWidth;
}

onMount(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth);

    return () => {
        window.removeEventListener('resize', updateWidth);
    };
});

const selectedClass = (thisIndex: number) => {
    return selected === thisIndex ? 'button-solid-primary' : 'button-ghost-primary';
};
    let classList = [
        selectedClass(0),
        selectedClass(1),
        selectedClass(2),
        selectedClass(3)
    ]

    $: {
        selected;
        classList = [
            selectedClass(0),
            selectedClass(1),
            selectedClass(2),
            selectedClass(3)
        ]
    }

function getHandleClick(index: number) {
    return () => {
        selected = index;
    }
}
</script>

<div class="button-select-group">
    <button class={classList[0]} on:click={getHandleClick(0)}>
        1{screenWidth > BREAK_POINT ? " day" : "d"}
    </button>
    <button class={classList[1]} on:click={getHandleClick(1)}>
        3{screenWidth > BREAK_POINT ? " days" : "d"}
    </button>
    <button class={classList[2]} on:click={getHandleClick(2)}>
        {screenWidth > BREAK_POINT ? "1 week" : "7d"}
    </button>
    <button class={classList[3]} on:click={getHandleClick(3)}>
        Never
    </button>
</div>

<style>
    .button-select-group {
        display: flex;
        width: 100%;
        gap: 0.125rem;
        margin-top: 1rem;
    }

    .button-select-group > button:not(:first-child):not(:last-child) {
        border-radius: 0;
    }

    .button-select-group > button:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .button-select-group > button:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }



    .button-select-group > button {
        flex: 1;
    }
</style>