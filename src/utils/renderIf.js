const renderIf = (condition, renderFunction) => {
    return condition ? renderFunction : null
}

export default renderIf