import { NextFunction, RequestHandler, Router, Request, Response } from 'express'

export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next)

const methods = ['get', 'post', 'delete', 'put'] as const
type Method = typeof methods[number]

export function toAysncHandlerRoute(router: Router) {
  for (const key in router) {
    const methodKey = key as Method
    if (methods.includes(methodKey)) {
      const method = router[methodKey]
      router[methodKey] = (path: any, ...callbacks: any[]) =>
        method.call(router, path, ...callbacks.map((cb) => asyncHandler(cb)))
    }
  }
  return router
}
