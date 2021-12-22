const connection = require('../database/connection');

const index = async (request, response) => {
    const { page = 1 } = request.query;

    const [ count ] = await connection('incidents').count();

    const incidents = await connection('incidents').select('*')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5) //esquema paginação
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

      response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
}

const create = async (request, response) => {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
    });
 
    return response.json({ id });
  }

const deleteRegister = async (request, response) => {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        /* Http: 204 - No content (Não retornou conteúdo) */
        if (!incident) {
        return response.status(204).json({ error: 'Not content found.' });
    }

    /* Http: 401 - Not authorized                               */
    /*       Caso tenta deletar incidente, de uma ong diferente */
    if (incident.ong_id != ong_id) {
        return response.status(401).json({ error: 'Operation not allowed.' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(200).send();
}

module.exports = {
    index,
    create,
    deleteRegister
}