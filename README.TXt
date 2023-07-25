Rotas:
- GET - /tasks
  Também deve ser possível realizar uma busca, filtrando as tasks pelo `title` e `description`

- `POST - /tasks`
    Deve ser possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
    Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.

- PUT - /tasks/:id
    Deve ser possível atualizar uma task pelo id.
    
    No body da requisição, deve receber somente o title e/ou description para serem atualizados.
    
    Se for enviado somente o title, significa que o description não pode ser atualizado e vice-versa.
    Antes de realizar a atualização, deve ser feito uma validação se o id pertence a uma task salva no banco de dados.


