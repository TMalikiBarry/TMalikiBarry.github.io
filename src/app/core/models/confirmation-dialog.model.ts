import {ThemePalette} from "@angular/material/core";

export class ConfirmationDialog {
  title!: string;
  content!: string;
  confirmText!: string;
  cancelText!: string;
  colorAction!: ThemePalette;
}
