<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords"
          content="ecommerce, Fashion store, clean, minimal, modern, online store, responsive, retail, shopping, ecommerce store">
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <title inertia>{{ config('app.name', 'AM Fashion') }}</title>
{{--    <link rel="shortcut icon" href="{{asset('Media/Common/logo.png')}}"/>--}}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300&display=swap"
        rel="stylesheet">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
@if (Session::has('alert'))
    <div class="alert alert-warning">
        {{ Session::get('alert') }}
    </div>
@endif
@inertia
</body>
</html>
