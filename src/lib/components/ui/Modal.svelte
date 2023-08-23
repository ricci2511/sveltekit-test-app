<div class="card p-6 w-modal shadow-xl">
	<header class="text-2xl font-semibold">
		<slot name="header" />
	</header>
	<main class="mt-5">
		<slot name="main" />
	</main>
	<footer class="flex space-x-1 justify-end mt-4">
		<slot name="footer" />
	</footer>
</div>
