<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>404 Not Found</title>
    <meta name="description" content="A simple url shorten app" />
</svelte:head>

<main>
    <div class="card glass">
        <h2 class="text-h2">404 {$page.error?.message}</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a class="button-glow-primary" href="/">
            Back to Home
        </a>
    </div>
</main>

<style>
    main > .card {
        margin: 15rem auto;
        max-width: 400px;
        padding: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
</style>