import tornado.template
from tornado.options import define, options

from config.static import load_config

define("port", default=3000, help="run on the given port", type=int)
define("debug", default=True, help="debug mode")
define("env", default='dev', help="runtime environment")
tornado.options.parse_command_line()

TEMPLATE_ROOT = 'src/templates'

settings = load_config('src/config', env=options.env)
settings['port'] = options.port or settings['port']
settings['debug'] = options.debug or settings['debug']
settings['xsrf_cookies'] = False
settings['template_loader'] = tornado.template.Loader(TEMPLATE_ROOT)
