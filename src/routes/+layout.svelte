<script>
	import '@koibumi-design/ui-css';
</script>

<div class="app">
	<main>
		<slot />
	</main>
	<footer>
		<p>This is an opensource project on <a class="text-link" href="https://github.com/koibumi-design/url-shorten">GitHub</a></p>
		<p>
			Powered by <a href="https://github.com/koibumi-design" class="text-link">Koibumi Design</a>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: url("/koibumi-bg.webp") no-repeat center center fixed;
		background-size: cover;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
	}

	footer {
		background-color: rgba(243, 243, 241, .3);
		backdrop-filter: blur(18px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
