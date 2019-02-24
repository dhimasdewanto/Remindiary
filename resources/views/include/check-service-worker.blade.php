<script type="text/javascript">
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
					.register('../serviceWorker.min.js')
					.then(reg => {})   // console.log('Service Worker: Registered (Pages)'))
					.catch(err => console.log(`Service Worker: Error: ${err}`));
		});
	}
</script>