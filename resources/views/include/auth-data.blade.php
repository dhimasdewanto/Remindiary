<meta name="auth_id" content="{{ auth()->check() ? auth()->user()->id : null }}">
<meta name="auth_name" content="{{ auth()->check() ? auth()->user()->name : null }}">
<meta name="auth_email" content="{{ auth()->check() ? auth()->user()->email : null }}">
<meta name="auth_image" content="{{ auth()->check() ? auth()->user()->profile_image : "default_image.jpg" }}">