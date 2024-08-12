import json

def load_json_file(filename):
    try:
        with open(filename, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []

def save_json_file(filename, data):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

def get_training_data():
    global input_text
    global output_category
    input_text = input("Enter Input (or type 'exit' to quit): ")
    if input_text.lower() == 'exit':
        return False

    output_category = input("Enter Output Category: ")
    input_words = input_text.lower().split()
    input_data = {word: 1 for word in input_words}
    output_data = {output_category: 1}

    new_training_entry = {
        "input": input_data,
        "output": output_data
    }

    training_data = load_json_file('training_data.json')
    training_data.append(new_training_entry)
    save_json_file('training_data.json', training_data)

    print(f"Training data added: {input_data} -> {output_data}")
    return True

def get_vocabulary():
    vocabulary_words = input_text
    if vocabulary_words.lower() == 'exit':
        return False

    vocabulary_list = load_json_file('vocabulary.json')
    new_words = vocabulary_words.lower().split()

    vocabulary_list.extend(new_words)
    vocabulary_list = list(set(vocabulary_list))  # Remove duplicates

    save_json_file('vocabulary.json', vocabulary_list)
    print(f"Vocabulary updated: {new_words}")
    return True

def get_response():
    input_text = output_category
    if input_text.lower() == 'exit':
        return False

    response_text = input(f"Enter Response for '{input_text}': ")

    response_data = load_json_file('responses.json')
    response_data[input_text] = response_text

    save_json_file('responses.json', response_data)
    print(f"Response added: {input_text} -> {response_text}")
    return True

while True:
    if not get_training_data():
        break
    if not get_vocabulary():
        break
    if not get_response():
        break

    print("\nData updated. Ready for new input.\n")

