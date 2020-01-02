import json


def load_config(path, env='dev'):
    with open(path + '/config-' + env + '.json', 'r') as env_file:
        loaded_config = json.loads(env_file.read())
    with open(path + '/credentials/' + env + '.json', 'r') as credentials_file:
        secrets = json.loads(credentials_file.read())

    return {**loaded_config, **secrets}
