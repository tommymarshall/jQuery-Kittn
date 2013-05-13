# jQuery Kittn Plugin

An easy code previewing plugin made especially for parts-kits.

## Getting Started
Kittn utilizes (for now) the [jQuery Snippet](http://www.steamdev.com/snippet/) plugin to prettify code snippets.

## The Code

    <!-- Vendor scripts -->
    <script src="jquery.js"></script>
    <script src="jquery.snippet.js"></script>
    <link rel="stylesheet" href="jquery.snippet.css">

    <!-- Kittn Begin! -->
    <script src="jquery.kittn.js"></script>
    <script type="text/javascript">
        $('[data-kittn="true"]').kittn();
    </script>

jQuery Kittn will then turn any element that has a `data-kittn="true"` attribute into a toggable snippet. Pretty cool, eh?

## Usage
Add the code above then hold the **Alt** key and click on an outlined (or other custom style you set) element. Kittn automatically removes the style applied by the plugin and the `data-kittn` attribute from the markup. Kittn also allows for nested parts kit code snippets.

## Optional Parameters

    $('[data-kittn="true"]').kittn({
        clipboardPath: "ZeroClipboard.swf",
        language: "html", // php, ruby, javascript, and tons more
        showClipboard: true,
        style: "outline: 3px dotted rgba(0,0,0,0.4)",
        theme: "emacs" // check out jquery snippet's websites for more
    });
