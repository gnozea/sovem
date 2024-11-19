<!DOCTYPE html>
@php
\App::setLocale("en");
$isAdmin = strpos(url()->current(), "dashboard");
@endphp
{{--<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">--}}

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    {{-- <meta name="csrf-token" content="{{ csrf_token() }}">--}}
    <meta name="auth-inspector" content="{{ Auth::check() }}">
    <title>Fè demad sèvis ou</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}">
    @if($isAdmin)
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    @else
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
    {{-- <link property="stylesheet" rel='stylesheet' id='impacto-patronus-font-google_fonts-css' href='https://fonts.googleapis.com/css?family=DM+Sans:400,400i,500,500i,700,700i%7CTitillium+Web:200,200i,300,300i,400,400i,600,600i,700,700i,900%7CKumbh+Sans:300,400,700&#038;subset=latin,latin-ext' type='text/css' media='all' />--}}
    {{-- <link property="stylesheet" rel='stylesheet' id='google-fonts-1-css' href='https://fonts.googleapis.com/css?family=Roboto%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto+Slab%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&#038;display=auto&#038;ver=6.1.1' type='text/css' media='all' />--}}
    <link rel="stylesheet" href="{{ asset("css/main.css") }}">

    @endif
    {{-- <link href="{{ asset('css/layout.min.css') }}" rel="stylesheet" type="text/css">--}}
    <link href="{{ asset('css/icons/icomoon/styles.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/icons/material/materialdesignicons.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/icons/fabric-icon/fabric-icons--inline.css') }}" rel="stylesheet" type="text/css">
    <link rel="icon" type="image/x-icon" href="{{ asset('/images/favicon.png') }}">
    <!-- Styles -->
    <style>
        body {
            position: relative;
        }

        .vighor-column-gap-extended>.vighor-row>.vighor-column>.vighor-element-populated {
            padding: 0;
        }

        /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
        html {
            line-height: 1.15;
            -webkit-text-size-adjust: 100%
        }

        body {
            margin: 0
        }

        a {
            background-color: transparent
        }

        [hidden] {
            display: none
        }

        html {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
            line-height: 1.5
        }

        *,
        :after,
        :before {
            box-sizing: border-box
        }

        a {
            color: inherit;
            text-decoration: inherit
        }

        svg,
        video {
            display: block;
            vertical-align: middle
        }

        video {
            max-width: 100%;
            height: auto
        }

        .bg-white {
            --bg-opacity: 1;
            background-color: #fff;
            background-color: rgba(255, 255, 255, var(--bg-opacity))
        }

        .bg-gray-100 {
            --bg-opacity: 1;
            background-color: #f7fafc;
            background-color: rgba(247, 250, 252, var(--bg-opacity))
        }

        .border-gray-200 {
            --border-opacity: 1;
            border-color: #edf2f7;
            border-color: rgba(237, 242, 247, var(--border-opacity))
        }

        .border-t {
            border-top-width: 1px
        }

        .flex {
            display: flex
        }

        .grid {
            display: grid
        }

        .hidden {
            display: none
        }

        .items-center {
            align-items: center
        }

        .justify-center {
            justify-content: center
        }

        .font-semibold {
            font-weight: 600
        }

        .h-5 {
            height: 1.25rem
        }

        .h-8 {
            height: 2rem
        }

        .h-16 {
            height: 4rem
        }

        .text-sm {
            font-size: .875rem
        }

        .text-lg {
            font-size: 1.125rem
        }

        .leading-7 {
            line-height: 1.75rem
        }

        .mx-auto {
            margin-left: auto;
            margin-right: auto
        }

        .ml-1 {
            margin-left: .25rem
        }

        .mt-2 {
            margin-top: .5rem
        }

        .mr-2 {
            margin-right: .5rem
        }

        .ml-2 {
            margin-left: .5rem
        }

        .mt-4 {
            margin-top: 1rem
        }

        .ml-4 {
            margin-left: 1rem
        }

        .mt-8 {
            margin-top: 2rem
        }

        .ml-12 {
            margin-left: 3rem
        }

        .-mt-px {
            margin-top: -1px
        }

        .max-w-6xl {
            max-width: 72rem
        }

        .min-h-screen {
            min-height: 100vh
        }

        .overflow-hidden {
            overflow: hidden
        }

        .p-6 {
            padding: 1.5rem
        }

        .py-4 {
            padding-top: 1rem;
            padding-bottom: 1rem
        }

        .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem
        }

        .pt-8 {
            padding-top: 2rem
        }

        .fixed {
            position: fixed
        }

        .relative {
            position: relative
        }

        .top-0 {
            top: 0
        }

        .right-0 {
            right: 0
        }

        .shadow {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)
        }

        .text-center {
            text-align: center
        }

        .text-gray-200 {
            --text-opacity: 1;
            color: #edf2f7;
            color: rgba(237, 242, 247, var(--text-opacity))
        }

        .text-gray-300 {
            --text-opacity: 1;
            color: #e2e8f0;
            color: rgba(226, 232, 240, var(--text-opacity))
        }

        .text-gray-400 {
            --text-opacity: 1;
            color: #cbd5e0;
            color: rgba(203, 213, 224, var(--text-opacity))
        }

        .text-gray-500 {
            --text-opacity: 1;
            color: #a0aec0;
            color: rgba(160, 174, 192, var(--text-opacity))
        }

        .text-gray-600 {
            --text-opacity: 1;
            color: #718096;
            color: rgba(113, 128, 150, var(--text-opacity))
        }

        .text-gray-700 {
            --text-opacity: 1;
            color: #4a5568;
            color: rgba(74, 85, 104, var(--text-opacity))
        }

        .text-gray-900 {
            --text-opacity: 1;
            color: #1a202c;
            color: rgba(26, 32, 44, var(--text-opacity))
        }

        .underline {
            text-decoration: underline
        }

        .antialiased {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale
        }

        .w-5 {
            width: 1.25rem
        }

        .w-8 {
            width: 2rem
        }

        .w-auto {
            width: auto
        }

        .grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr))
        }

        @media (min-width:640px) {
            .sm\:rounded-lg {
                border-radius: .5rem
            }

            .sm\:block {
                display: block
            }

            .sm\:items-center {
                align-items: center
            }

            .sm\:justify-start {
                justify-content: flex-start
            }

            .sm\:justify-between {
                justify-content: space-between
            }

            .sm\:h-20 {
                height: 5rem
            }

            .sm\:ml-0 {
                margin-left: 0
            }

            .sm\:px-6 {
                padding-left: 1.5rem;
                padding-right: 1.5rem
            }

            .sm\:pt-0 {
                padding-top: 0
            }

            .sm\:text-left {
                text-align: left
            }

            .sm\:text-right {
                text-align: right
            }
        }

        @media (min-width:768px) {
            .md\:border-t-0 {
                border-top-width: 0
            }

            .md\:border-l {
                border-left-width: 1px
            }

            .md\:grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr))
            }
        }

        @media (min-width:1024px) {
            .lg\:px-8 {
                padding-left: 2rem;
                padding-right: 2rem
            }
        }

        @media (prefers-color-scheme:dark) {
            .dark\:bg-gray-800 {
                --bg-opacity: 1;
                background-color: #2d3748;
                background-color: rgba(45, 55, 72, var(--bg-opacity))
            }

            .dark\:bg-gray-900 {
                --bg-opacity: 1;
                background-color: #1a202c;
                background-color: rgba(26, 32, 44, var(--bg-opacity))
            }

            .dark\:border-gray-700 {
                --border-opacity: 1;
                border-color: #4a5568;
                border-color: rgba(74, 85, 104, var(--border-opacity))
            }

            .dark\:text-white {
                --text-opacity: 1;
                color: #fff;
                color: rgba(255, 255, 255, var(--text-opacity))
            }

            .dark\:text-gray-400 {
                --text-opacity: 1;
                color: #cbd5e0;
                color: rgba(203, 213, 224, var(--text-opacity))
            }

            .dark\:text-gray-500 {
                --tw-text-opacity: 1;
                color: #6b7280;
                color: rgba(107, 114, 128, var(--tw-text-opacity))
            }
        }
    </style>

    <style id="vighor-frontend-inline-css" type="text/css">
        .vighor-kit-2640 {
            --e-global-color-primary: #6EC1E4;
            --e-global-color-secondary: #54595F;
            --e-global-color-text: #7A7A7A;
            --e-global-color-accent: #61CE70;
            --e-global-color-6cae81e1: #4054B2;
            --e-global-color-26df8df7: #23A455;
            --e-global-color-33c1d835: #000;
            --e-global-color-65444de9: #FFF;
            --e-global-typography-primary-font-family: "Roboto";
            --e-global-typography-primary-font-weight: 600;
            --e-global-typography-secondary-font-family: "Roboto Slab";
            --e-global-typography-secondary-font-weight: 400;
            --e-global-typography-text-font-family: "Roboto";
            --e-global-typography-text-font-weight: 400;
            --e-global-typography-accent-font-family: "Roboto";
            --e-global-typography-accent-font-weight: 500;
        }

        .vighor-section.vighor-section-boxed>.vighor-container {
            max-width: 1200px;
        }

        .e-con {
            --container-max-width: 1200px;
        }

        .vighor-widget:not(:last-child) {
            margin-bottom: 0px;
        }

        .vighor-element {
            --widgets-spacing: 0px;
        }

            {}

        .sc_layouts_title_caption {
            display: var(--page-title-display);
        }

        @media(max-width:1024px) {
            .vighor-section.vighor-section-boxed>.vighor-container {
                max-width: 1024px;
            }

            .e-con {
                --container-max-width: 1024px;
            }
        }

        @media(max-width:767px) {
            .vighor-section.vighor-section-boxed>.vighor-container {
                max-width: 767px;
            }

            .e-con {
                --container-max-width: 767px;
            }
        }

        .vighor-594 .vighor-element.vighor-element-8fa36ae:not(.vighor-motion-effects-element-type-background),
        .vighor-594 .vighor-element.vighor-element-8fa36ae>.vighor-motion-effects-container>.vighor-motion-effects-layer {
            background-color: #E6E9F2;
        }

        .vighor-594 .vighor-element.vighor-element-8fa36ae {
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-8fa36ae>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-55663d0 .sc_promo_text_inner {
            background-color: #FAAC50;
        }

        .vighor-594 .vighor-element.vighor-element-e3652b7 {
            --spacer-size: 30px;
        }

        .vighor-594 .vighor-element.vighor-element-57ece9bf:not(.vighor-motion-effects-element-type-background)>.vighor-column-wrap,
        .vighor-594 .vighor-element.vighor-element-57ece9bf>.vighor-column-wrap>.vighor-motion-effects-container>.vighor-motion-effects-layer {
            background-color: #07203C;
        }

        .vighor-594 .vighor-element.vighor-element-57ece9bf>.vighor-element-populated {
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-57ece9bf>.vighor-element-populated>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-57ece9bf>.vighor-element-populated.vighor-column-wrap {
            padding: 19% 19% 19% 19%;
        }

        .vighor-594 .vighor-element.vighor-element-8b389d6:not(.vighor-motion-effects-element-type-background),
        .vighor-594 .vighor-element.vighor-element-8b389d6>.vighor-motion-effects-container>.vighor-motion-effects-layer {
            background-color: #0D2C50;
        }

        .vighor-594 .vighor-element.vighor-element-8b389d6 {
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.18);
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
            padding: 22px 23px 16px 23px;
        }

        .vighor-594 .vighor-element.vighor-element-8b389d6>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-bc-flex-widget .vighor-594 .vighor-element.vighor-element-3b96761.vighor-column .vighor-column-wrap {
            align-items: center;
        }

        .vighor-594 .vighor-element.vighor-element-3b96761.vighor-column.vighor-element[data-element_type="column"]>.vighor-column-wrap.vighor-element-populated>.vighor-widget-wrap {
            align-content: center;
            align-items: center;
        }

        .vighor-594 .vighor-element.vighor-element-893aa6d {
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
            padding: 22px 23px 16px 23px;
        }

        .vighor-594 .vighor-element.vighor-element-893aa6d>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-e6c8ce4:not(.vighor-motion-effects-element-type-background),
        .vighor-594 .vighor-element.vighor-element-e6c8ce4>.vighor-motion-effects-container>.vighor-motion-effects-layer {
            background-color: #0D2C50;
        }

        .vighor-594 .vighor-element.vighor-element-e6c8ce4 {
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.18);
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
            padding: 22px 23px 16px 23px;
        }

        .vighor-594 .vighor-element.vighor-element-e6c8ce4>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-bc-flex-widget .vighor-594 .vighor-element.vighor-element-3a3f3537.vighor-column .vighor-column-wrap {
            align-items: flex-end;
        }

        .vighor-594 .vighor-element.vighor-element-3a3f3537.vighor-column.vighor-element[data-element_type="column"]>.vighor-column-wrap.vighor-element-populated>.vighor-widget-wrap {
            align-content: flex-end;
            align-items: flex-end;
        }

        .vighor-594 .vighor-element.vighor-element-3a3f3537:not(.vighor-motion-effects-element-type-background)>.vighor-column-wrap,
        .vighor-594 .vighor-element.vighor-element-3a3f3537>.vighor-column-wrap>.vighor-motion-effects-container>.vighor-motion-effects-layer {
            background-image: url("https://helpline.impacto-patronus.ancorathemes.com/wp-content/uploads/2021/06/shutterstock_192317513-copyright.jpg");
            background-position: bottom center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .vighor-594 .vighor-element.vighor-element-3a3f3537>.vighor-element-populated {
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-3a3f3537>.vighor-element-populated>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-130f560e:not(.vighor-motion-effects-element-type-background),
        .vighor-594 .vighor-element.vighor-element-130f560e>.vighor-motion-effects-container>.vighor-motion-effects-layer {
            background-color: #D73C4E;
        }

        .vighor-594 .vighor-element.vighor-element-130f560e {
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
            padding: 9% 14% 9% 14%;
        }

        .vighor-594 .vighor-element.vighor-element-130f560e>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-1ba3a42 {
            --spacer-size: 30px;
        }

        .vighor-594 .vighor-element.vighor-element-d8dcaef:not(.vighor-motion-effects-element-type-background),
        .vighor-594 .vighor-element.vighor-element-d8dcaef>.vighor-motion-effects-container>.vighor-motion-effects-layer {
            background-color: #E6E9F2;
        }

        .vighor-594 .vighor-element.vighor-element-d8dcaef {
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-d8dcaef>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-7433309:not(.vighor-motion-effects-element-type-background)>.vighor-column-wrap,
        .vighor-594 .vighor-element.vighor-element-7433309>.vighor-column-wrap>.vighor-motion-effects-container>.vighor-motion-effects-layer {
            background-image: url("https://helpline.impacto-patronus.ancorathemes.com/wp-content/uploads/2021/06/shutterstock_762386689-copyright.jpg");
            background-position: center center;
            background-size: cover;
        }

        .vighor-594 .vighor-element.vighor-element-7433309>.vighor-element-populated {
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-7433309>.vighor-element-populated>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-ebcde17:not(.vighor-motion-effects-element-type-background)>.vighor-column-wrap,
        .vighor-594 .vighor-element.vighor-element-ebcde17>.vighor-column-wrap>.vighor-motion-effects-container>.vighor-motion-effects-layer {
            background-color: #07203C;
        }

        .vighor-594 .vighor-element.vighor-element-ebcde17>.vighor-element-populated {
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-ebcde17>.vighor-element-populated>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-ebcde17>.vighor-element-populated.vighor-column-wrap {
            padding: 0em 5em 0em 5em;
        }

        .vighor-594 .vighor-element.vighor-element-6450732 {
            --spacer-size: 196px;
        }

        .vighor-594 .vighor-element.vighor-element-6fca843 {
            --spacer-size: 43px;
        }

        .vighor-594 .vighor-element.vighor-element-03940ff .vighor-icon-list-icon i {
            color: #FFFFFF;
        }

        .vighor-594 .vighor-element.vighor-element-03940ff .vighor-icon-list-icon svg {
            fill: #FFFFFF;
        }

        .vighor-594 .vighor-element.vighor-element-03940ff .vighor-icon-list-item:hover .vighor-icon-list-icon i {
            color: #CE1313;
        }

        .vighor-594 .vighor-element.vighor-element-03940ff .vighor-icon-list-item:hover .vighor-icon-list-icon svg {
            fill: #CE1313;
        }

        .vighor-594 .vighor-element.vighor-element-03940ff {
            --e-icon-list-icon-size: 35px;
        }

        .vighor-594 .vighor-element.vighor-element-03ff60f {
            --spacer-size: 48px;
        }

        .vighor-594 .vighor-element.vighor-element-38e96a0 {
            --spacer-size: 196px;
        }

        .vighor-594 .vighor-element.vighor-element-f3cfbd6 {
            transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-f3cfbd6>.vighor-background-overlay {
            transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
        }

        .vighor-594 .vighor-element.vighor-element-c83295a {
            --spacer-size: 38px;
        }

        .vighor-594 .vighor-element.vighor-element-87b62c4 {
            --spacer-size: 30px;
        }

        .vighor-594 .vighor-element.vighor-element-563202e .sc_promo_text_inner {
            background-color: #FAAC50;
        }

        @media(max-width:1024px) {
            .vighor-594 .vighor-element.vighor-element-57ece9bf>.vighor-element-populated.vighor-column-wrap {
                padding: 12% 12% 12% 12%;
            }

            .vighor-594 .vighor-element.vighor-element-130f560e {
                padding: 10% 10% 10% 10%;
            }

            .vighor-594 .vighor-element.vighor-element-ebcde17>.vighor-element-populated.vighor-column-wrap {
                padding: 0% 12% 0% 12%;
            }

            .vighor-594 .vighor-element.vighor-element-6450732 {
                --spacer-size: 50px;
            }

            .vighor-594 .vighor-element.vighor-element-6fca843 {
                --spacer-size: 20px;
            }

            .vighor-594 .vighor-element.vighor-element-03ff60f {
                --spacer-size: 20px;
            }

            .vighor-594 .vighor-element.vighor-element-38e96a0 {
                --spacer-size: 50px;
            }
        }

        @media(max-width:767px) {
            .vighor-594 .vighor-element.vighor-element-57ece9bf>.vighor-element-populated.vighor-column-wrap {
                padding: 10% 10% 10% 10%;
            }
        }
    </style>

</head>
{{-- @php--}}
{{-- $darkLight = \App\Helpers\Purpose::getUserPreference(['default_theme']);--}}
{{-- $theme = '';--}}
{{-- if (!$darkLight[0]) $theme = 'light-theme';--}}
{{-- if ($darkLight[0] == 'DISABLED') $theme = 'light-theme';--}}
{{-- if ($darkLight[0] == 'ENABLED') $theme = 'dark-theme';--}}
{{-- @endphp--}}

<body class="">
    <div id="app"></div>
    <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>

    @if($isAdmin)
    <script src="{{ asset('js/core.js') }}"></script>
    @else

    @endif
</body>

</html>