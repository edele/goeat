<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        NotFoundHttpException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    public function render($request, Exception $e)
    {
        if (app()->environment('local')) {
            return parent::render($request, $e);
        }

        $response = ['message' => $this->trans($e->getMessage())];
        $status = 400;

        if ($e instanceof ModelNotFoundException) {
            $response['message'] = trans('api.notFound');
            $status = 404;
        }

        if ($e instanceof NotFoundHttpException) {
            $response['message'] = trans('api.notImplemented');
            $status = 501;
        }

        if ($this->isHttpException($e))
        {
            $status = $e->getStatusCode();
        }

        return response()->json($response, $status);
    }
}
