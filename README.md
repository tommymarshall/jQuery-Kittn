## jQuery Kittn Plugin

An easy code previewing plugin made especially for part's kits. Kittn utilizes (for now) the [jQuery Snippet](http://www.steamdev.com/snippet/) plugin to prettify code snippets.

### Get Started
Throw the vendor assets before your closing `<head>` or `<body>` tag.

    <!-- Vendor scripts -->
    <script src="vendor/jquery.js"></script>
    <script src="vendor/jquery.snippet.js"></script>
    <link rel="stylesheet" href="vendor/jquery.snippet.css">

 Add the Kittn code before your closing `<body>`, but after the abve vendor assets.
    <!-- Kittn Begin! -->
    <script src="jquery.kittn.js"></script>
    <script type="text/javascript">
        $('[data-kittn="true"]').kittn();
    </script>

jQuery Kittn will then turn any element that has a `data-kittn="true"` attribute into a toggable snippet. Pretty cool, eh?

### Toggling Kittn and Usage
After adding the above code to your site, open it up in the browser and hit the **Alt** key. Elements matching the selector you sent to the plugin will be outlined (or other custom style you set). Kittn automatically removes the style applied by the plugin and the `data-kittn` attribute from the markup. Kittn also allows for nested parts kit code snippets, so you don't want to worry about uncessary code being outputted in the snippet viewer.

### Default/Optional Parameters

    $('[data-kittn="true"]').kittn({
        clipboardPath: "ZeroClipboard.swf",
        language: "html", // php, ruby, javascript, and tons more
        showClipboard: true,
        style: "outline: 3px dotted rgba(0,0,0,0.4)",
        theme: "emacs" // check out jquery snippet's websites for more
    });
