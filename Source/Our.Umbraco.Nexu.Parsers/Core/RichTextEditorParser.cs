﻿namespace Our.Umbraco.Nexu.Parsers.Core
{
    using System.Collections.Generic;

    using global::Umbraco.Core.Models;

    using Our.Umbraco.Nexu.Core.Interfaces;

    /// <summary>
    /// The rich text editor parser.
    /// </summary>
    public class RichTextEditorParser : IPropertyParser
    {
        public bool IsParserFor(IDataTypeDefinition dataTypeDefinition)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ILinkedEntity> GetLinkedEntities(object propertyValue)
        {
            throw new System.NotImplementedException();
        }
    }
}
