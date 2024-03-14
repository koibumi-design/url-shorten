<script lang="ts">
    import ExpireSelect from "./ExpireSelect.svelte";
    import {ExpireTimeOptions} from "$lib/expireTimeOptions";

    let select = 0;
    const options: ExpireTimeOptions[] = [
        ExpireTimeOptions.d1,
        ExpireTimeOptions.d3,
        ExpireTimeOptions.d7,
        ExpireTimeOptions.never
    ]

    enum ButtonText {
        Shorten = "Shorten",
        Waiting = "...",
        Success = "Success",
    }

    enum CopyButtonText {
        Copy = "Copy",
        Copied = "Copied",
    }

    let buttonText = ButtonText.Shorten;
    let copyButtonText = CopyButtonText.Copy;

    function onCopy() {
        copyButtonText = CopyButtonText.Copied;
        navigator.clipboard.writeText(shortenedUrl);
        setTimeout(() => {
            copyButtonText = CopyButtonText.Copy;
        }, 1000);
    }

    let shortenedUrl = "";

    function callApi() {
        const op = options[select];
        fetch("/api/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                originalUrl,
                expireTime: op
            })
        })
            .then(res => res.json())
            .then(data => {
                const url = new URL(window.location.href);
                shortenedUrl = `${url.origin}/${data}`;
                buttonText = ButtonText.Success;
                setTimeout(() => {
                    buttonText = ButtonText.Shorten;
                }, 1000);
            });
    }

    let originalUrl = "";


</script>

<div class="card glass short">
    <h2 class="text-h2 emphasize">
        URL Shorten
    </h2>
    <label class="input-solid-normal fix-margin-top">
        <input type="text" placeholder="Original URL" bind:value={originalUrl}/>
    </label>
    <div class="expire-in">
        <p>
            Expire in:
        </p>
        <ExpireSelect bind:selected={select}/>
    </div>
    <div id="result">
        <label class="input-solid-normal fix-margin-top">
            <input type="text" placeholder="Shortened URL" readonly bind:value={shortenedUrl}/>
        </label>
        <button class="button-solid-primary" on:click={onCopy}>
            {copyButtonText}
        </button>
    </div>
    <button class="button-glow-primary" on:click={callApi}>
        {buttonText}
    </button>
</div>


<style>
    .short {
        max-width: 40rem;
        margin: 4rem auto;
    }

    .short > * {
        width: 100%;
    }

    .short > h2.text-h2 {
        text-align: center;
    }

    .short p {
        padding-left: .125rem;
        margin-bottom: 0.5rem;
    }

    .short > * {
        margin-bottom: 1.5rem;
    }

    .short > *:last-child {
        margin-bottom: 0;
    }

    #result {
        display: flex;
        gap: 0.5rem;
    }

    #result > label {
        flex: 1;
    }

    .expire-in {
        padding: 1rem;
        background-color: #e7e7e3;
        border-radius: 0.75rem;
    }

</style>
