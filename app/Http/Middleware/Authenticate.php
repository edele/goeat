<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => trans('api.token.expired')], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['message' => trans('api.token.invalid')], 401);
        } catch (JWTException $e) {
            return response()->json(['message' => trans('api.token.absent')], 401);
        }

        if (!$user) {
            return response()->json(['message' => trans('api.user.notFound')], 401);
        }

        $request->user = $user;
        return $next($request);
    }
}
