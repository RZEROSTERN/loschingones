# Client

## Cómo usar
* Clonar repo.
* Copiar `client/src/app/config/index.js.dist` a `client/src/app/config/index.js`.
* Editar `client/src/app/config/index.js` con la configuración correcta.
* `gulp build`.
* La versión final estará en `client/www`.
 
## Cómo editar
Se puede ejecutar `gulp build` para reconstruir todo, pero usando las tareas específicas se ahorra tiempo.tiempo

* `gulp styles` reconstruye los css
* `gulp scripts` reconstruye el javascript
* `gulp static` remplaza los archivos estáticos (assets)