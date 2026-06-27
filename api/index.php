<?php

define('LARAVEL_START', microtime(true));

require __DIR__.'/../api-topup/vendor/autoload.php';

$app = require_once __DIR__.'/../api-topup/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
)->send();

$kernel->terminate($request, $response);
